import BlockSidebar from './side/BlockSidebar';
import BlockEditorContent from './main/BlockEditorContent';

const BlockEditor = () => {
  return (
    <div className="flex h-full w-full">
      {/* 사이드바 */}
      <aside className="w-[302px] h-full shrink-0">
        <BlockSidebar />
      </aside>

      {/* 메인 영역 */}
      <main className="flex-1 h-full">
        <BlockEditorContent />
      </main>
    </div>
  );
};

export default BlockEditor;
