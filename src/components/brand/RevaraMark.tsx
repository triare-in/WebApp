interface RevaraMarkProps {
  size?: number
}

export function RevaraMark({ size = 32 }: RevaraMarkProps) {
  return (
    <svg viewBox="0 0 264 264" width={size} height={size} aria-hidden="true" focusable="false">
      <polygon points="34.7,214.5 132.2,250.3 132.2,226.3 34.7,190.5" fill="#4F3892" />
      <polygon points="132.2,250.3 229.6,214.5 229.6,190.5 132.2,226.3" fill="#3F2F73" />
      <polygon points="132.2,154.6 229.6,190.5 132.2,226.3 34.7,190.5" fill="#5B41A5" />
      <polygon points="88.7,154.5 132.2,170.5 132.2,160.5 88.7,144.5" fill="#CBBBF0" />
      <polygon points="132.2,170.5 175.7,154.5 175.7,144.5 132.2,160.5" fill="#AF9AE6" />
      <polygon points="132.2,128.5 175.7,144.5 132.2,160.5 88.7,144.5" fill="#E4DAF8" />
      <polygon points="76.5,144.5 132.2,165 132.2,141 76.5,120.5" fill="#CBBBF0" />
      <polygon points="132.2,165 187.8,144.5 187.8,120.5 132.2,141" fill="#AF9AE6" />
      <polygon points="132.2,100 187.8,120.5 132.2,141 76.5,120.5" fill="#E4DAF8" />
      <polygon points="55.6,80.5 132.2,108.6 132.2,55 76.5,34.5" fill="#6B4FBB" />
      <polygon points="132.2,108.6 208.7,80.5 187.8,34.5 132.2,55" fill="#4F3892" />
      <polygon points="132.2,14 187.8,34.5 132.2,55 76.5,34.5" fill="#A58BF0" />
      <polygon points="132.2,22.2 165.6,34.5 132.2,46.8 98.8,34.5" fill="#9479E8" />
    </svg>
  )
}
