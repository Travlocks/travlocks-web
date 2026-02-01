import { useState } from 'react';
import { TRANSPORT_TYPE, type TransportTypeKey } from '@/shared/constants/transportType';
import SelectButton from '@/feature/block/onboarding/components/SelectButton';

interface TransportTypeSelectorProps {
  /**
   * 선택된 이동 수단 목록이 변경될 때 호출되는 콜백입니다.
   *
   * @param transportTypes 현재 선택된 이동 수단 키 배열입니다.
   */
  onSelect?: (transportTypes: TransportTypeKey[]) => void;
}

/**
 * 이동 수단 선택 컴포넌트입니다.
 *
 * @remarks
 * 온보딩 과정에서 사용자의 주요 이동 수단을 다중 선택할 수 있는 UI를 제공합니다.
 * 사용자는 도보, 대중교통, 차량 등의 이동 수단을 자유롭게 선택 및 해제할 수 있습니다.
 */
const TransportTypeSelector = ({ onSelect }: TransportTypeSelectorProps) => {
  const [selectedTypes, setSelectedTypes] = useState<TransportTypeKey[]>([]); // 현재 선택된 이동 수단 키 목록

  /**
   * 특정 이동 수단의 선택 상태를 토글하는 핸들러입니다.
   *
   * @param transportType 토글할 이동 수단 키입니다.
   *
   * @remarks
   * 이미 선택된 이동 수단이면 해제하고, 선택되지 않았다면 선택 목록에 추가합니다.
   * 변경된 선택 목록은 onSelect 콜백을 통해 상위 컴포넌트로 전달됩니다.
   */
  const handleToggleTransport = (transportType: TransportTypeKey) => {
    let newSelectedTypes: TransportTypeKey[];

    if (selectedTypes.includes(transportType)) {
      newSelectedTypes = selectedTypes.filter((type) => type !== transportType);
    } else {
      newSelectedTypes = [...selectedTypes, transportType];
    }

    setSelectedTypes(newSelectedTypes);
    onSelect?.(newSelectedTypes);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {TRANSPORT_TYPE.map((transport) => (
        <SelectButton
          key={transport.id}
          type="transport"
          item={transport}
          isSelected={selectedTypes.includes(transport.key)}
          onClick={() => handleToggleTransport(transport.key)}
        />
      ))}
    </div>
  );
};

export default TransportTypeSelector;
