type CounterProps = {
  time: number; // time in milliseconds
  interval: number; // interval in milliseconds
  onFinish: () => void;
};
export default function Counter({ time, interval, onFinish }: CounterProps) {}
