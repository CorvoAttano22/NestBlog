import { Article } from '../src/article/article.entity';
import { Token } from '../src/auth/token.entity';
import { User } from '../src/user/user.entity';
import DataSource from './config';
import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 8,
    min: 4,
  },
});

const generateSlug = (title) => {
  return (
    encodeURIComponent(title.toLowerCase().replaceAll(' ', '-')) +
    '-' +
    crypto.randomUUID().split('-')[0]
  );
};

const run = async () => {
  await DataSource.initialize();

  const userRepository = DataSource.getRepository(User);
  const articleRepository = DataSource.getRepository(Article);
  const tokenRepository = DataSource.getRepository(Token);

  const users = await userRepository.find();
  if (users.length > 0) {
    await userRepository.remove(users);
  }

  for (let i = 1; i < 11; i++) {
    const user = new User();
    user.name = `user${i}`;
    user.handle = `user${i}`;
    user.email = `user${i}@mail.com`;
    await userRepository.save(user);

    const token = new Token();
    token.token = `token-${user.name}`;
    token.user = user;
    await tokenRepository.save(token);

    for (let j = 0; j < 5; j++) {
      const article = new Article();
      lorem.format = 'plain';
      article.title = lorem.generateWords(5);
      article.slug = generateSlug(article.title);
      lorem.format = 'html';
      article.content = lorem.formatString(lorem.generateParagraphs(2));

      if (j < 4) {
        article.published = true;
        article.published_at = new Date();
      }
      article.user = user;
      await articleRepository.save(article);
    }
  }
};

run();
