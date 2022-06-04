interface AvatarProps {
  className: string;
  src: string;
  alt: string;
  size: string;
  onClick: () => void;
}

export const Avatar = ({
  className,
  src,
  alt,
  size = "md",
  ...props
}: AvatarProps) => {
  return (
    <div className={className}>
      <img
        className={`rounded-full w-${size} h-${size}`}
        src={src}
        alt={alt}
        {...props}
      />
    </div>
  );
};
