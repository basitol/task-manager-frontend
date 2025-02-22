# Task Manager Application

A full-stack task management application built with Next.js, Laravel, and Docker.

## Features

- User authentication (login/register)
- Task CRUD operations
- Task status management
- Sorting and filtering
- Pagination
- Responsive design
- Docker containerization

## Tech Stack

### Frontend

- Next.js 14
- TypeScript
- RTK Query
- Shadcn UI
- Tailwind CSS
- Redux Toolkit

### Backend

- Laravel
- MySQL
- JWT Authentication

### Infrastructure

- Docker
- Docker Compose

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- npm or yarn
- Git

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd task-manager
```

2. Create environment files:

```bash
# Frontend (.env)
cp .env.example .env
```

3. Build and start the containers:

```bash
docker-compose up -d --build
```

The application will be available at:

- Frontend: http://localhost:3000
- API: http://localhost:8000

## Development Setup

For local development without Docker:

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages and components
│   │   ├── components/    # Dashboard-specific components
│   │   └── page.tsx      # Dashboard page
│   └── login/            # Authentication pages
├── components/           # Shared components
│   ├── auth/            # Authentication components
│   ├── layout/          # Layout components
│   ├── tasks/           # Task-related components
│   └── ui/              # UI components (shadcn)
├── features/            # Redux slices
│   └── authSlice.ts    # Authentication state management
├── services/           # API services
│   └── api.ts         # RTK Query API definitions
├── types/             # TypeScript types
│   └── task.ts       # Task-related types
└── docker/           # Docker configuration files
```

## API Endpoints

### Authentication

- POST `/api/login` - User login
- POST `/api/register` - User registration
- POST `/api/logout` - User logout

### Tasks

- GET `/api/tasks` - List tasks (with pagination)
- POST `/api/tasks` - Create task
- PUT `/api/tasks/:id` - Update task
- DELETE `/api/tasks/:id` - Delete task
- PATCH `/api/tasks/:id/complete` - Mark task as complete

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## Docker Commands

- Build containers: `docker-compose build`
- Start services: `docker-compose up -d`
- Stop services: `docker-compose down`
- View logs: `docker-compose logs -f`
- Rebuild specific service: `docker-compose up -d --build <service-name>`

## Environment Variables

### Frontend (.env)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### API (.env)

```env
DB_HOST=db
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

## Task Features

- Create new tasks with name, description, and due date
- Update task status (Pending, In-progress, Completed)
- Sort tasks by name, due date, or status
- Filter tasks by status
- Paginated task list
- Mark tasks as complete
- Delete tasks

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## Troubleshooting

### Common Issues

1. **API Connection Error**

   - Check if the API is running
   - Verify environment variables
   - Ensure correct API URL in frontend configuration

2. **Docker Issues**

   - Ensure all required ports are available
   - Check Docker logs for specific errors
   - Verify Docker and Docker Compose installation

3. **Database Connection**
   - Confirm database credentials
   - Check database container status
   - Verify network connectivity between containers

## License

[MIT License](LICENSE)

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Laravel](https://laravel.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Docker](https://www.docker.com/)
