import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type MessageInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
};

const MessageInput = ({ value, onChange, onSend }: MessageInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-4 border-t flex gap-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        className="flex-1"
      />
      <Button onClick={onSend}>Send</Button>
    </div>
  );
};

export { MessageInput };
