module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'development':
	{
		console.log('Dev --------');
            return 'development';
	}
        case 'production':
            return 'production';

        default:
            return 'production';
    }
};
