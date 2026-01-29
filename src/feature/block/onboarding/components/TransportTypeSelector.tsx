import { useState } from 'react';
import { TRANSPORT_TYPE, type TransportTypeId } from '@/shared/constants/transportType';
import SelectButton from '@/feature/block/onboarding/components/SelectButton';

const TransportTypeSelector = () => {
  const [selectedIds, setSelectedIds] = useState<TransportTypeId[]>([]);

  const handleToggleTransport = (transportId: TransportTypeId) => {
    setSelectedIds((prev) => {
      const isAlreadySelected = prev.includes(transportId);

      // 이미 선택된 값이면 선택 해제
      if (isAlreadySelected) {
        return prev.filter((id) => id !== transportId);
      }

      // 새로 추가
      return [...prev, transportId];
    });
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {TRANSPORT_TYPE.map((transport) => (
        <SelectButton
          key={transport.id}
          type="transport"
          item={transport}
          isSelected={selectedIds.includes(transport.id)}
          onClick={handleToggleTransport}
        />
      ))}
    </div>
  );
};

export default TransportTypeSelector;
