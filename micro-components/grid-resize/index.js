const ResizeEdge = (props) => {
  const edgeRef = React.useRef(null);

  const [hasMount, setHasMount] = React.useState(false);

  const [isDragging, setIsDragging] = React.useState(false);

  React.useEffect(() => {
    setHasMount(true);
  }, []);

  React.useEffect(() => {
    if (!hasMount) return;

    let edgeLeft;
    let edgeTop;

    const onMouseMove = (event) => {
      console.log(props.position, "move");
      event.preventDefault();
      const clientX = event.clientX;
      const clientY = event.clientY;

      const offsetX = edgeLeft - clientX;
      const offsetY = edgeTop - clientY;

      let updateParentValue = {};
      switch (props.position) {
        case "top":
          updateParentValue = {
            height: offsetY,
          };
          break;
        case "bottom":
          updateParentValue = {
            height: -offsetY,
          };
          break;
        case "left":
          updateParentValue = {
            width: offsetX,
          };
          break;
        case "right":
          updateParentValue = {
            width: -offsetX,
          };
          break;
      }

      edgeLeft = clientX;
      edgeTop = clientY;

      props.updateParentCallback(updateParentValue);
    };

    const onMouseDown = (e) => {
      console.log(props.position);
      edgeLeft = e.clientX;
      edgeTop = e.clientY;

      setIsDragging(true);

      window.addEventListener("mousemove", onMouseMove);
    };

    const onMouseUp = () => {
      setIsDragging(false);

      window.removeEventListener("mousemove", onMouseMove);
    };

    edgeRef.current.addEventListener("mousedown", onMouseDown);

    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      edgeRef.current.removeEventListener("mousedown", onMouseDown);
    };
  }, [hasMount]);

  return (
    <div
      ref={edgeRef}
      className={`resizable-straight rs-${
        ["top", "bottom"].includes(props.position) ? "vertical" : "horizontal"
      } ${props.position} ${isDragging ? "dragging" : ""}`}
    ></div>
  );
};

const MainBox = () => {
  const [height, setHeight] = React.useState(0);
  const [width, setWidth] = React.useState(0);

  const boxReft = React.useRef(null);

  React.useEffect(() => {
    setHeight(boxReft.current.clientHeight);
    setWidth(boxReft.current.clientWidth);
  }, []);

  const updateParentCallback = (updateVal) => {
    if (updateVal.width) {
      setWidth((prev) => prev + updateVal.width);
    } else if (updateVal.height) {
      setHeight((prev) => prev + updateVal.height);
    }
  };

  return (
    <div
      ref={boxReft}
      className="resizable-box"
      style={{
        width: Math.max(100, width),
        height: Math.max(100, height),
      }}
    >
      <ResizeEdge position="top" updateParentCallback={updateParentCallback} />
      <ResizeEdge
        position="bottom"
        updateParentCallback={updateParentCallback}
      />
      <ResizeEdge position="left" updateParentCallback={updateParentCallback} />
      <ResizeEdge
        position="right"
        updateParentCallback={updateParentCallback}
      />
      <MainGridBox />
    </div>
  );
};

const GridItem = () => {
  return <div className="grid-item"></div>;
};

const maxItemWidth = 178;
const minItemWidth = 100;

function calculateMaxItemInBoxWithSpacing(containerWidth, itemWidth, spacing) {
  const availableWidth = containerWidth - itemWidth;

  if (availableWidth < 0) return 0;

  const maxItem = Math.floor(availableWidth / (itemWidth + spacing));

  return maxItem + 1;
}

function calculateNumberOfItemsInGrid(containerWidth, containerHeight) {
  const itemSpacing = 16;
  const itemAspectRatio = 16 / 9;

  if (
    containerWidth < minItemWidth ||
    containerHeight < minItemWidth / itemAspectRatio
  ) {
    return { rows: 0, columns: 0 };
  }

  if (containerWidth < maxItemWidth) {
    const itemHeight = containerWidth / itemAspectRatio;
    const rows = calculateMaxItemInBoxWithSpacing(
      containerHeight,
      itemHeight,
      itemSpacing
    );

    return { rows, columns: 1 };
  }

  if (containerHeight < maxItemWidth / itemAspectRatio) {
    const itemWidth = containerHeight * itemAspectRatio;
    const columns = calculateMaxItemInBoxWithSpacing(
      containerWidth,
      itemWidth,
      itemSpacing
    );

    return { rows: 1, columns };
  }

  const itemWidth = maxItemWidth;
  const itemHeight = itemWidth / itemAspectRatio;

  const rows = calculateMaxItemInBoxWithSpacing(
    containerHeight,
    itemHeight,
    itemSpacing
  );
  const columns = calculateMaxItemInBoxWithSpacing(
    containerWidth,
    itemWidth,
    itemSpacing
  );

  return { rows, columns };
}

const MainGridBox = () => {
  const timeoutRef = React.useRef(null);

  const [rows, setRows] = React.useState(3);
  const [columns, setColumns] = React.useState(4);

  const containerBoxRef = React.useCallback((node) => {
    if (!node) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          const { width, height } = entry.contentRect;
          const padding = {
            width: 8 * 2,
            height: 8 * 2,
          };
          console.log(width, height);

          clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            const { rows: rRows, columns: rColumns } =
              calculateNumberOfItemsInGrid(
                width - padding.width,
                height - padding.height
              );
            setRows(rRows);
            setColumns(rColumns);
          }, 200);
        }
      }
    });

    resizeObserver.observe(node);
  }, []);

  console.log(rows, columns);

  return (
    <div className="container-grid-box" ref={containerBoxRef}>
      <div
        className="grid-container"
        style={{
          "--item-max-width": `${maxItemWidth}px`,
        }}
      >
        {Array(rows * columns)
          .fill(0)
          .map((item, index) => (
            <GridItem />
          ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="main-container">
      <MainBox />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
