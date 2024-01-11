import * as styles from "./styles.css";

export type IMetadata = {
  title: string;
  date: string;
  description: string;
  categories: [];
  published: boolean;
};

const Metadata = ({
  title,
  date,
  description,
  categories,
  published,
}: IMetadata) => {
  if (!published) return;

  return (
    <header className={styles.metadata}>
      <h1 className={styles.title}>{title}</h1>
      <time className={styles.publishedDate}>
        {new Date(date).toLocaleString()}
      </time>
      <p>{description}</p>
      <div>
        {categories &&
          categories.map((category: string, index: number) => (
            <div className={styles.category} key={index}>
              {category}
            </div>
          ))}
      </div>
    </header>
  );
};

export default Metadata;
