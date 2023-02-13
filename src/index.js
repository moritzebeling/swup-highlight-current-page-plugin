import Plugin from '@swup/plugin';

export default class SwupHighlightCurrentPagePlugin extends Plugin {
	name = 'SwupHighlightCurrentPagePlugin';

	constructor( options = {} ) {
		super();

		this.selector = options.selector || 'a';
		this.className = options.className || 'current';
		this.ariaCurrent = options.ariaCurrent || 'page';
	}

	highlight() {

		const currentPath = window.location.pathname;
		const anchors = document.querySelectorAll( this.selector );

		for (const a of anchors) {

			let href = new URL( a.href );
			if( !href ){ continue }

			if( currentPath == href.pathname ){
				a.classList.add( this.className );
				a.ariaCurrent = this.ariaCurrent;
			} else {
				a.classList.remove( this.className );
				a.ariaCurrent = false;
			}

		}
	}

	mount() {
		this.swup.on('contentReplaced', this.highlight);
	}

	unmount() {
		this.swup.off('contentReplaced', this.highlight);
	}
}