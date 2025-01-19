import Image from 'next/image'

interface AvatarProps extends React.HTMLAttributes<HTMLImageElement> {
  image?: string | null
}

export const Avatar: React.FC<AvatarProps> = ({ image }) => (
  <div className="relative w-10 h-10">
    <Image
      src={image || '/placeholder.jpg'}
      alt="avatar"
      fill
      className="rounded-full overflow-hidden"
    />
  </div>
)
