import * as styles from "./styles.css";

export type IMetadata = {
  title: string;
  date: string;
  description: string;
  readingTime: string;
  categories: [];
  published: boolean;
};

const Metadata = ({
  title,
  date,
  description,
  categories,
  published,
  readingTime,
}: IMetadata) => {
  if (!published) return;

  return (
    <header className={styles.metadata}>
      <h2 className={styles.title}>{title}</h2>
      <time className={styles.publishedDate} dateTime={date}>
        {new Date(date).toLocaleDateString("ko-kR")}
      </time>
      <span className={styles.readingTime}>{readingTime}</span>
      <p className={styles.description}>{description}</p>
      <div>
        {categories &&
          categories.map((category: string, index: number) => (
            <a
              className={styles.category}
              key={index}
              href={`/tags/${category.replace(/\s/g, "-")}`}
            >
              {category}
            </a>
          ))}
      </div>
    </header>
  );
};

export default Metadata;
