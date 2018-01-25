(function($) {
'use strict'; 

	var ModuleName = 'banner';
    
	var Module = function ( ele, options ) {
		//Module
		this.ele = ele;
		//<div class="banner" id="banner"></div>
		this.$ele = $(ele);
		//jQuery.fn.init [div#banner.banner, context: div#banner.banner]
		this.option = options;
		//{style: "test", whenClickCallback: ƒ}
        this.status=['opened','closing','closed','opening'];
        this.SetStatus = 0;
        this.$btn=$('<div class="btn" id="btn"></div>');
        this.setInterval;
        self=this;
	};


	    Module.DEFAULTS = {
		openAtStart: false,
		autoToggle: true,
	    class: {
	    	opened: 'opened',
	        closing: 'closing',
			closed: 'closed',
			opening: 'opening'
	    },
	    button: {
			closeText: '收合',
			openText: '展開',
			class: 'btn'
	    },
        transition:true,
        whenTransition: function() {
		console.log('whenTransition');
	     }
	    };

           
    Module.prototype.init = function () {    

           this.$ele.append(this.$btn);	
 
           var x = this.SetStatus;
          if( this.option.openAtStart ===true){
             this.SetStatus = 2;//closed
			 document.getElementById('btn').innerHTML = self.option.button.closeText;

			 setTimeout(function(){ self.$ele.addClass(self.status[self.SetStatus]);
             document.getElementById('btn').innerHTML = self.option.button.openText;
			  }, 2000);
             document.getElementById("banner").addEventListener("transitionend", self.imgclose());
		  }else{
		  	 this.SetStatus = 0;
			 document.getElementById('btn').innerHTML = self.option.button.closeText;
			 self.$ele.addClass(self.status[self.SetStatus]); 
			 $('.img').removeClass('imgclose');
          };

          if ( this.option.transition ===true ) {
			 this.addTransition();
		  };
		  

        };////Module.prototype.init

 






		Module.prototype.addTransition = function() {
				if (!this.$ele.hasClass('transition') ) {
					this.$ele.addClass('transition');
				}
		};

       Module.prototype.toggle = function () {

       if ( this.option.transition ===true ) {			 
		if ((self.$ele.hasClass(self.option.class.closed))) {//closed	
			this.toggleopen();
			$('.img').removeClass('imgclose');
		   } else if ((self.$ele.hasClass(self.option.class.opened))) {//opened
			 this.toggleclose();
		};
        	this.setInterval = setInterval(this.option.whenTransition, 50);
	    }
		else{
            if ((self.$ele.hasClass(self.option.class.closed))) {//closed	
			 this.open();
             document.getElementById('btn').innerHTML = this.option.button.closeText;
		} else if ((self.$ele.hasClass(self.option.class.opened))) {//opened
			 this.close();
             document.getElementById('btn').innerHTML = this.option.button.openText;
		};
		};		
	    };


        Module.prototype.toggleopen = function () {//opened
		this.$ele.addClass(this.option.class.opening);
		this.$ele.removeClass(this.option.class.closed);
		 console.log('111');
         document.getElementById("banner").addEventListener("transitionend", this.toggletransitionEnd);
	     };

        Module.prototype.toggleclose = function () {//closed
		this.$ele.addClass(this.option.class.closing);
		this.$ele.removeClass(this.option.class.opened);
        document.getElementById("banner").addEventListener("transitionend", this.toggletransitionEnd);
	     };


         Module.prototype.toggletransitionEnd = function () {
           if (self.$ele.hasClass(self.option.class.closing)) {    
           	self.$ele.removeClass(self.option.class.closing);
	        self.$ele.addClass(self.option.class.closed);
			document.getElementById('btn').innerHTML = self.option.button.openText;
			$('.img').addClass('imgclose');
		 } else if (self.$ele.hasClass(self.option.class.opening)) {
		 	self.$ele.removeClass(self.option.class.opening);
            self.$ele.addClass(self.option.class.opened);
	        document.getElementById('btn').innerHTML = self.option.button.closeText;	       
		}
	    self.clearInterval();
	    };
      
        Module.prototype.clearInterval = function () {
            clearInterval(this.setInterval);
         };




         
        Module.prototype.open = function () {//closed
		this.$ele.addClass(this.option.class.opened);
		this.$ele.removeClass(this.option.class.closed);
		document.getElementById('btn').innerHTML = self.option.button.closeText;
		$('.img').removeClass('imgclose');
	     };

        Module.prototype.close = function () {//opened
		this.$ele.addClass(this.option.class.closed);
		this.$ele.removeClass(this.option.class.opened);
		document.getElementById('btn').innerHTML = self.option.button.openText;
		$('.img').addClass('imgclose')
	     };

        Module.prototype.imgclose = function () {
        	 setTimeout(function(){
        	$('.img').addClass('imgclose')}, 2750);
        };




	$.fn[ModuleName] = function ( methods, options ) {
		  // console.log(this);jQuery.fn.init
		return this.each(function(i, ele){
			var $this = $(this);
			// console.log($this);
			// jQuery.fn.init [div#banner.banner, context: div#banner.banner]
			var module = $this.data( ModuleName );
			var opts = null;
			if ( !!module ) {
				if ( typeof methods === 'string' &&  typeof options === 'undefined' ) {
					module[methods]();
				} else if ( typeof methods === 'string' &&  (typeof options === 'object' || typeof options === 'function') ) {
					module[methods](options);
				} else {
					console.log('unsupported options!');
					throw 'unsupported options!';
				}
			} else {
				opts = $.extend( {}, Module.DEFAULTS, ( typeof methods === 'object' && methods ), ( typeof options === 'object' && options ) );
				module = new Module(this, opts);
				// console.log(module);
				$this.data( ModuleName, module );
				// console.log($this.data( ModuleName ));
				module.init();
				module.$btn.on('click', function() {
				module.toggle();				
				});

			};
		});
	};

})(jQuery);
