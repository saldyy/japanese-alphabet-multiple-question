type Props = {
  point: number; // time in seconds
  onTryGainClicked: () => void; // time in seconds
};
export default function TestResult({ point, onTryGainClicked }: Props) {

  return (
    <div>
      <p>You scored: {point}</p>
      <b className="cursor-pointer" onMouseDown={onTryGainClicked}>Try again?</b>
    </div>
  );
}
