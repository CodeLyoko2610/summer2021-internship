# Wolt Summer 2021 Internships - Backend assignment

## Project information

> Technologies used: `NodeJS`, `npm`,`TypeScript`\
> Database is omitted as the focus is on NodeJS and handling requests. If database is used, I prefer `MongoDB`.

## Usage

- Fork, clone this repo from [here](https://github.com/CodeLyoko2610/summer2021-internship)
- Install node modules using `npm install`
- Start the server using `npm start`

## Testing

- The project is ready for testing at the url below. User coordinates are provided as **request parameters**:

```
http://localhost:3000/discovery?lon=24.950&lat=60.1709
```

- Changing the coordinates to see different restaurants in the response.
- Invalid coordinates inputs are handled and do not stop the server.
- Each `restaurants` object contains no more than 10 items and sorted based on predefined criteria.
- Objects with length of 0 are omitted.

## Folder structure

```
.
├── node_modules/
├── dist/  
├── package.json
├── README.md
├── restaurants.json
├── src
│   ├── app.ts
│   ├── controllers
│   │   └── discovery.ts
│   ├── helpers
│   │   ├── distanceInMeters.ts
│   │   └── stringToMilliSecond.ts
│   ├── routers
│   │   └── discovery.ts
│   ├── services
│   │   └── discovery.ts
│   └── types
│       └── index.ts
├── tsconfig.json
└── tslint.json
```

- The project starting point is the `src/app.ts`
- `routers`, `controllers` and `services` are used to separate different handlers level and for scalability
- `helpers` contains common used functions
- `types` contains all custom types.
- The project is not structured into different features as for it simplicity.

## More concerns?

I am more than happy to answer! \
Email: dangchuongpham1999@gmail.com \
GitHub: https://github.com/CodeLyoko2610 \
LinkedIn: https://www.linkedin.com/in/dang-chuong-pham-669041153/

**Thank you for your time!**
