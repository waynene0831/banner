
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
	};


	    Module.DEFAULTS = {
		openAtStart: true,
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
	    };


    Module.prototype.init = function () {    
    	   console.log(this);
           this.$ele.append(this.$btn);	

           var x = this.SetStatus;
          ///////設定起始狀態
          if( this.option.openAtStart ===true){
             this.SetStatus = 2;//closed
			 document.getElementById('btn').innerHTML = '展開';

		  }else{
			 this.SetStatus = 0;//opened
			 document.getElementById('btn').innerHTML = '收合';
          };/////



          if ( this.option.transition ===true ) {
			 this.addTransition();
		  };// 是否要有transition效果


		   this.$ele.addClass(this.status[this.SetStatus]);
		   ////看初始狀態給正確的class
		   //console.log(x);
		   //true=0 false=2
		   //console.log(this);
		   //Module
           //console.log(this.nowStatus(this.SetStatus)); OPENED

     };////Module.prototype.init


		Module.prototype.addTransition = function() {
				if (!this.$ele.hasClass('transition') ) {
					this.$ele.addClass('transition');
				}
		};////addTransition

        Module.prototype.nowStatus = function(SetStatus){
			return this.option.class[this.status[SetStatus]];
			//this.status抓四個設定狀態
		}//設定索引


/////////////////////////////////////////////////////////////
       Module.prototype.toggle = function () {

		if ( this.SetStatus === 2) {	
			this.open();
		} else if ( this.SetStatus === 0 ) {
			 this.close();
		}
		if(this.SetStatus === 0 || this.SetStatus === 1 ){
			document.getElementById('btn').innerHTML = '收合';
		}else{
			document.getElementById('btn').innerHTML = '展開';
		};

	    };

        Module.prototype.open = function () {
		this.$ele.removeClass(this.nowStatus(this.SetStatus)).addClass(this.nowStatus(this.closeSetStatus()));
  		this.$ele.removeClass(this.nowStatus(this.SetStatus)).addClass(this.nowStatus(this.closeSetStatus()));
		return this.SetStatus;
	     };

        Module.prototype.close = function () {
		this.$ele.removeClass(this.nowStatus(this.SetStatus)).addClass(this.nowStatus(this.openSetStatus()));
		this.$ele.removeClass(this.nowStatus(this.SetStatus)).addClass(this.nowStatus(this.openSetStatus()));
		return this.SetStatus;			
	     };


        Module.prototype.openSetStatus = function () {
		if(this.SetStatus > this.status.lenght-1){  // opened
			this.SetStatus = 0;
		}
		this.SetStatus ++;
		return this.SetStatus;
	    };

        Module.prototype.closeSetStatus = function () {//  closed
		if(this.SetStatus < this.status.lenght-1){
			this.SetStatus = 2;
		}
		this.SetStatus --;
		return this.SetStatus;
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
			}
		});
	};

})(jQuery);

