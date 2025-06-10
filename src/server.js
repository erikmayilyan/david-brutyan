const categoriesUaRouter = require('./categoriesUa/categoriesUa.route');
const categoriesRuRouter = require('./categoriesRu/categoriesRu.route');
const categoriesEnRouter = require('./categoriesEn/categoriesEn.route');
const seasonsUaRouter = require('./seasonsUa/seasonsUa.route');
const seasonsRuRouter = require('./seasonsRu/seasonsRu.route');
const seasonsEnRouter = require('./seasonsEn/seasonsEn.route');
const colorsUaRouter = require('./colorsUa/colorsUa.route');
const colorsRuRouter = require('./colorsRu/colorsRu.route');
const colorsEnRouter = require('./colorsEn/colorsEn.route');

app.use('/api/categoriesUa', categoriesUaRouter);
app.use('/api/categoriesRu', categoriesRuRouter);
app.use('/api/categoriesEn', categoriesEnRouter);
app.use('/api/seasonsUa', seasonsUaRouter);
app.use('/api/seasonsRu', seasonsRuRouter);
app.use('/api/seasonsEn', seasonsEnRouter);
app.use('/api/colorsUa', colorsUaRouter);
app.use('/api/colorsRu', colorsRuRouter);
app.use('/api/colorsEn', colorsEnRouter); 