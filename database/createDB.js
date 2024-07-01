import { models } from './DB.js';
const { Role, User, Lesson, Course } = models;

const createRoles = async () => {
  const data = [
    {
      id: 0,
      name: 'student',
      description: 'student account with rights to view courses',
    },
    {
      id: 1,
      name: 'teacher',
      description: 'teacher account with rights to view, edit, create courses',
    },
    {
      id: 2,
      name: 'admin',
      description: 'super user account',
    },
  ];

  for (const item of data) {
    const role = new Role(item);
    await role.save();
  }
};

const createUsers = async () => {
  const data = [
    {
      id: 1,
      login: 'joliver',
      password: 'password',
      name: 'John Oliver',
      email: 'joliver@mail.com',
      role: 'student',
      courses: [
        'Node.js Developer',
        'React.js Developer',
        'Fullstack Developer',
      ],
    },
    {
      id: 2,
      login: 'rhill',
      password: 'password',
      name: 'Robert Hill',
      email: 'rhill@mail.com',
      role: 'student',
      courses: ['React.js Developer'],
    },
    {
      id: 3,
      login: 'jking',
      password: 'password',
      name: 'James King',
      email: 'jking@mail.com',
      role: 'student',
      courses: ['Fullstack Developer'],
    },
    {
      id: 4,
      login: 'adavis',
      password: 'password',
      name: 'Adam Davis',
      email: 'adavis@mail.com',
      role: 'teacher',
      courses: ['Node.js Developer'],
    },
    {
      id: 5,
      login: 'hjones',
      password: 'password',
      name: 'Harry Jones',
      email: 'hjones@mail.com',
      role: 'teacher',
      courses: ['React.js Developer', 'Fullstack Developer'],
    },
    {
      id: 6,
      login: 'mjackson',
      password: 'password',
      name: 'Mario Jackson',
      email: 'mjackson@mail.com',
      role: 'admin',
      courses: [],
    },
  ];

  for (const item of data) {
    const user = new User(item);
    await user.save();
  }
};

const createLessons = async () => {
  const data = [
    {
      id: 0,
      title: 'Gitflow',
      description:
        'Урок по ведению репозитория курса, правила создания веток для сдачи практических заданий',
      comments: [
        {
          date: new Date('2024-05-16'),
          author: 'John Oliver',
          content: 'Good introductory tutorial',
          rating: 5,
        },
        {
          date: new Date('2024-05-19'),
          author: 'James King',
          content: "Now it's clearer to me",
          rating: 5,
        },
      ],
      rating: 5,
      media: [],
    },
    {
      id: 1,
      title: 'Создание и стилизация HTML страниц',
      description:
        'Урок посвящен работе с разметкой страницы (HTML) и ее стилизацией (CSS)',
      comments: [],
      rating: 5,
      media: [],
    },
    {
      id: 2,
      title: 'ООП в JavaScript',
      description: 'Объектно-ориентированный JavaScript простыми словами',
      comments: [],
      rating: 5,
      media: [],
    },
    {
      id: 3,
      title: 'Установка и настройка React',
      description:
        'Настройка проекта ReactJS с использованием create-react-app (CRA) либо через конфигурирацию приложения, используя webpack + babel',
      comments: [],
      rating: 5,
      media: [],
    },
    {
      id: 4,
      title: 'React Hooks',
      description: 'React hooks',
      comments: [],
      rating: 5,
      media: [],
    },
    {
      id: 5,
      title: 'React components lifecycle',
      description: 'Жизненный цикл компонентов, Lifecycle hooks',
      comments: [],
      rating: 5,
      media: [],
    },
    {
      id: 6,
      title: 'React + redux',
      description: 'Работать с Redux в React приложении',
      comments: [],
      rating: 5,
      media: [],
    },
    {
      id: 7,
      title: 'Redux toolkit',
      description:
        'Использование Redux-toolkit. Разобраться, что такое тестирование Redux, что нужно тестировать и как.',
      comments: [],
      rating: 5,
      media: [],
    },
    {
      id: 8,
      title: 'Введение в Node и NPM',
      description: 'Обзор и установка окружения Node.js',
      comments: [
        {
          date: new Date('2024-05-10'),
          author: 'John Oliver',
          content: 'Great lesson, thanks!',
          rating: 5,
        },
        {
          date: new Date('2024-05-12'),
          author: 'Mario Jackson',
          content: 'Everything is clear, thank you!',
          rating: 5,
        },
      ],
      rating: 5,
      media: [],
    },
    {
      id: 9,
      title: 'Введение в MongoDB',
      description: 'Хранение данных в MongoDB',
      comments: [],
      rating: 5,
      media: [],
    },
    {
      id: 10,
      title: 'Введение в Nest.js',
      description: 'Создание приложения на Nest.js',
      comments: [],
      rating: 5,
      media: [],
    },
    {
      id: 11,
      title: 'Введение в GraphQL',
      description:
        'Использование инструментов для конфигурации GraphQL в проекте',
      comments: [],
      rating: 5,
      media: [],
    },
  ];

  for (const item of data) {
    const lesson = new Lesson(item);
    await lesson.save();
  }
};

const createCourses = async () => {
  const data = [
    {
      id: 0,
      title: 'Node.js Developer',
      description: 'Development of server applications on Node.js',
      difficulty: 'average',
      tags: ['node', 'express', 'mongoDB'],
      authors: ['Adam Davis'],
      teachers: ['Adam Davis'],
      admins: ['Adam Davis', 'Harry Jones'],
      comments: [
        {
          date: new Date('2024-04-01'),
          author: 'Adam Davis',
          content: 'I hope my first course will be useful',
          rating: 5,
        },
      ],
      rating: 5,
      lessons: [
        'Введение в Node и NPM',
        'Web Servers',
        'Введение в MongoDB',
        'Введение в Nest.js',
        'Введение в GraphQL',
      ],
    },
    {
      id: 1,
      title: 'React.js Developer',
      description: 'The most popular JS framework for Frontend development',
      difficulty: 'average',
      tags: ['react', 'typescript', 'redux'],
      authors: ['Harry Jones'],
      teachers: ['Harry Jones'],
      admins: ['Adam Davis', 'Harry Jones'],
      comments: [
        {
          date: new Date('2024-04-24'),
          author: 'Robert Hill',
          content: 'Excellent course for middle developers',
          rating: 5,
        },
      ],
      rating: 5,
      lessons: [
        'Gitflow',
        'Установка и настройка React',
        'React components lifecycle',
        'React Hooks',
        'React + redux',
        'Redux toolkit',
      ],
    },
    {
      id: 2,
      title: 'Fullstack Developer',
      description: 'The most popular JS framework for Frontend development',
      difficulty: 'basic',
      tags: ['html', 'css', 'react', 'typescript', 'node', 'mongoDB'],
      authors: ['Harry Jones'],
      teachers: ['Harry Jones'],
      admins: ['Adam Davis', 'Harry Jones'],
      comments: [],
      rating: 4.5,
      lessons: [
        'Gitflow',
        'Создание и стилизация HTML страниц',
        'ООП в JavaScript',
        'Установка и настройка React',
        'React Hooks',
        'Введение в Node и NPM',
        'Введение в MongoDB',
      ],
    },
  ];

  for (const item of data) {
    const course = new Course(item);
    await course.save();
  }
};

await createRoles();
await createUsers();
await createLessons();
await createCourses();
