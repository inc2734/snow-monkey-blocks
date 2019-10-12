'use strict';

import {
	registerBlock,
	registerSidebar,
} from './helper/helper';

import * as section from '../../block/section';
import * as sectionWithBgvideo from '../../block/section-with-bgvideo';
import * as sectionWithBgimage from '../../block/section-with-bgimage';
import * as sectionBreakTheGrid from '../../block/section-break-the-grid';
import * as sectionSideHeading from '../../block/section-side-heading';
import * as recentPosts from '../../block/recent-posts';
import * as taxonomyPosts from '../../block/taxonomy-posts';
import * as pickupSlider from '../../block/pickup-slider';
import * as contentsOutline from '../../block/contents-outline';
import * as childPages from '../../block/child-pages';
import * as container from '../../block/container';

[
	section,
	sectionWithBgvideo,
	sectionWithBgimage,
	sectionBreakTheGrid,
	sectionSideHeading,
	recentPosts,
	taxonomyPosts,
	pickupSlider,
	contentsOutline,
	childPages,
	container,
].forEach( registerBlock );

import * as menu from '../../plugin/menu';

[
	menu,
].forEach( registerSidebar );
