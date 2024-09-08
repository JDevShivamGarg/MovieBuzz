import { FC } from "react";

interface AvatarGroupProps {
  avatars: string[];
}

const AvatarGroup: FC<AvatarGroupProps> = ({ avatars }) => {
  return (
    <div className="flex -space-x-2 overflow-hidden">
      {avatars.map((avatar, index) => (
        <img
          key={index}
          alt={`Avatar ${index + 1}`}
          src={avatar}
          className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
        />
      ))}
    </div>
  );
};

export default AvatarGroup;
