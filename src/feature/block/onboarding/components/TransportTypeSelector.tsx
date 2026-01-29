import { useState } from 'react';
import { TRANSPORT_TYPE, type TransportTypeKey } from '@/shared/constants/transportType';
import SelectButton from '@/feature/block/onboarding/components/SelectButton';

interface TransportTypeSelectorProps {
  onSelect?: (transportTypes: TransportTypeKey[]) => void;
}

const TransportTypeSelector = ({ onSelect }: TransportTypeSelectorProps) => {
  const [selectedTypes, setSelectedTypes] = useState<TransportTypeKey[]>([]);

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
