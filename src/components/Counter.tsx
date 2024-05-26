type CounterProps = {
  time: number; // time in seconds
};
export default function Counter({ time }: CounterProps) {

  return <div>Time left: {time} seconds</div>;

}
