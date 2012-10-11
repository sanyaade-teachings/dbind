define(['dbind/bind', 'dojo/Stateful', 'dijit/form/TextBox'], function(bind, Stateful, TextBox){
        function Model(props) {
            var stateful = new Stateful(props),
                first = bind(stateful, 'first'),
                last = bind(stateful, 'last'),
                fullName = bind(stateful, 'fullName').to(bind(function (first, last) {
                    console.log('making full name', first, last);
                    return [].join.apply(arguments);
                }).to([first, last]));

			fullName.then(function(fullName){
				console.log("The full name is now", fullName);
			});
            return stateful;
        }
            
        model = Model({
            first: 'first',
            last: 'last'
        });
		console.log(model);
        var viewModel = {
            last: new TextBox().placeAt('content')
        };
        
        bind(viewModel).to(model);

        model.set("first", "John");
        model.set("last", "Doe");
        
        console.log("Full name: ", model.fullName);
});