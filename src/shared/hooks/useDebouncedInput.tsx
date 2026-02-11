import { useEffect, useRef, useState } from 'react';

/**
 * `useDebouncedInput` 훅의 설정 옵션 타입
 */
interface useDebouncedInputProps {
  /**
   * 디바운스 지연 시간
   * @defaultValue 300
   */
  delay?: number;
  submit: () => void; // submit 트리거 시 실행되는 콜백 함수
}

/**
 * 입력값을 관리하며 디바운싱 된 값을 제공하는 커스텀 훅입니다.
 *
 * - input 요소에 바로 바인딩이 가능한 'inputProps'를 제공합니다.
 * - 입력값 변경 시 debounce 처리를 거쳐 'debouncedValue'를 갱신합니다.
 * - 외부에서 submit을 트리거 할 수 있는 'onSubmit'을 제공합니다.
 *
 * @example
 * ```
 * const { inputProps, debouncedValue, onSubmit } = useDebouncedInput({
 *  delay: 500,
 *  submit: () => {
 *      console.log('submit');
 *  }
 * });
 *
 * return (
 *  <>
 *      <input {...inputProps}/>
 *      <p>{debouncedValue}</p>
 *      <button onClick={onSubmit}>submit</button>
 *  </>
 * )
 * ```
 *
 * @param props - 디바운스 설정 및 submit 콜백
 * @returns
 * - inputProps: input 컴포넌트에 spread 가능한 props
 * - debouncedValue: 디바운스 처리된 입력값
 * - onSubmit: submit 콜백 실행 함수
 * - setValue: input 값을 강제로 변경하는 함수
 */
export function useDebouncedInputProps({ delay = 300, submit }: useDebouncedInputProps) {
  const [value, setValue] = useState(''); // 즉시 반영되는 값
  const [debouncedValue, setDebouncedValue] = useState(''); // 디바운스가 적용된 input 값

  const timeRef = useRef<number | null>(null); // debounce 타이머 id 저장용 ref

  // input의 onChange 핸들러
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // value 변경 시 debounce 로직 수행
  useEffect(() => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }

    timeRef.current = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
  }, [value, delay]);

  // submti 콜백
  const onSubmit = () => {
    submit();
  };

  // 입력값 초기화 함수
  const reset = () => {
    setValue('');
    setDebouncedValue('');
  };

  return {
    inputProps: {
      value,
      onChange,
    },
    debouncedValue,
    onSubmit,
    setValue,
    reset,
  };
}
