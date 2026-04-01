// Change this line - Railway assigns its own PORT
var PORT = process.env.PORT || 5000;

console.log('');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'MISSING');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'MISSING');
console.log('PORT:', PORT);
console.log('');

connectDB().then(function() {
    app.listen(PORT, '0.0.0.0', function() {
        console.log('');
        console.log('Yogentix Server Started!');
        console.log('Port: ' + PORT);
        console.log('Environment: ' + (process.env.NODE_ENV || 'development'));
        console.log('');
    });
}).catch(function(err) {
    console.error('Failed to start:', err.message);
    process.exit(1);
});