import { OrganizationProfile } from "@clerk/nextjs";

const OrganizationIdSettings = () => {
  return (
    <div className="w-full min-w-0">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              boxShadow: "none",
              width: "100%",
            },
            card: {
              border: "1px solid #e5e5e5",
              boxShadow: "none",
              width: "auto",
            },
          },
        }}
      />
    </div>
  );
};

export default OrganizationIdSettings;
