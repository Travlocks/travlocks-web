<<<<<<< HEAD
import { Block } from '@/shared/components/Block/Block';
import { convertToPolygonConnections, createRectPoints } from '@/shared/components/Block/blockShape';
import BlockEditor from '@/feature/block/blockBuild/components/BlockEditor';

const BlockPage = () => {
  return (
    <div className="flex h-[1091px] w-screen overflow-hidden">
      {/* TODO: 여기다가 여행 타이틀 */}
      <BlockEditor />
      
      <Block
        category="식당"
        title="향라식당"
        duration="2시간"
        icon="food"
        points={[
          { x: 0, y: 0 },
          { x: 160, y: 0 },
          { x: 160, y: 160 },
          { x: 320, y: 160 },
          { x: 320, y: 320 },
          { x: 0, y: 320 },
        ]}
        connections={[
          { edgeIndex: 0, type: 'plug', align: 'start' },
          { edgeIndex: 3, type: 'socket', align: 'end' },
          { edgeIndex: 4, type: 'socket', align: 'start' },
          { edgeIndex: 5, type: 'plug', align: 'end' },
        ]}
      />

    </div>
  );
};

export default BlockPage;
