const SectionTitle = ({
  title,
  paragraph,
  width = "570px",
  center,
  mb = "50px",
}: {
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
  mb?: string;
  className?: string;
}) => {
  return (
    <>
      <div
        className={`w-full ${center ? "mx-auto text-center" : ""}`}
        style={{marginBottom: mb }}
      >
        <h2 className="mb-4 text-xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
          {title}
        </h2>
        <p className="text-base !leading-relaxed text-body-color md:text-lg mb-10">
          {paragraph}
        </p>
      </div>
    </>
  );
};

export default SectionTitle;
