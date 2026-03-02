type ContentPagesHeaderProps = {
  title?: string;
  description?: string;
};

export function ContentPagesHeader({
  title = "Content Pages",
  description = "System management and detailed overview.",
}: ContentPagesHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
