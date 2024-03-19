const MainBox = () => {
  const handleDrag = (e) => {
    console.log(e);
  };

  return (
    <div className="resizable-box" draggable onDragStart={handleDrag}>
      <div className="resizable-straight rs-horizontal left"></div>
      <div className="resizable-straight rs-horizontal right"></div>
      <div className="resizable-straight rs-vertical top"></div>
      <div className="resizable-straight rs-vertical bottom"></div>
      <div>Hello</div>
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
