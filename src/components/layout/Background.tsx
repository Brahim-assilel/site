export const Background = () => (
  <div className="fixed inset-0 -z-50">
    <div className="absolute inset-0 bg-[#0D0B15]" />
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle at 50% 0, rgba(0, 191, 255, 0.1), transparent 40%), radial-gradient(circle at 100% 100%, rgba(138, 43, 226, 0.1), transparent 50%)",
      }}
    />
  </div>
);
