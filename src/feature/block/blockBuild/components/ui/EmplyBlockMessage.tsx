interface EmptyBlockMessageProps {
  isSearching: boolean;
  emptyMessage: string;
}

const EmptyBlockMessage = ({ isSearching, emptyMessage }: EmptyBlockMessageProps) => {
  if (!isSearching && emptyMessage === null) return null;

  return <p className="text-center text-base-color-2 py-4">{isSearching ? '검색 결과가 없습니다' : emptyMessage}</p>;
};

export default EmptyBlockMessage;
