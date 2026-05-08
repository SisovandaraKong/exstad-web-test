const ProgramHeaderSkeleton: React.FC = () => {
  return (
    <div className="w-full grid p-[24px] gap-[24px] rounded-t-[24px] bg-background animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-[316px] bg-gray-300 rounded-[10px] mt-[20px]" />

      {/* Tabs placeholder */}
      <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-6 gap-4 py-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-8 w-full bg-gray-300 rounded-full"></div>
        ))}
      </div>
    </div>
  );
};
export default ProgramHeaderSkeleton;