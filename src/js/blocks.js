'use strict';

import {
	registerBlock,
	registerFormat,
} from './helper/helper';

//import * as accordion from '../../block/accordion';
//import * as accordionItem from '../../block/accordion/item';
//import * as alert from '../../block/alert';
//import * as balloon from '../../block/balloon';
//import * as box from '../../block/box';
//import * as btn from '../../block/btn';
//import * as btnBox from '../../block/btn-box';
import * as categoriesList from '../../block/categories-list';
import * as countdown from '../../block/countdown';
import * as directoryStructure from '../../block/directory-structure';
import * as directoryStructureItemDirectory from '../../block/directory-structure/item/directory';
import * as directoryStructureItemFile from '../../block/directory-structure/item/file';
import * as evaluationStar from '../../block/evaluation-star';
import * as faq from '../../block/faq';
import * as faqItem from '../../block/faq/item';
import * as items from '../../block/items';
import * as itemsItem from '../../block/items/item';
import * as itemsItemStandard from '../../block/items/item/standard';
import * as itemsItemBlockLink from '../../block/items/item/block-link';
import * as itemsItemBanner from '../../block/items/item/banner';
import * as limitedDatetime from '../../block/limited-datetime';
import * as list from '../../block/list';
import * as mediaText from '../../block/media-text';
import * as panels from '../../block/panels';
import * as panelsItemVertical from '../../block/panels/item/vertical';
import * as panelsItemHorizontal from '../../block/panels/item/horizontal';
import * as priceMenu from '../../block/price-menu';
import * as priceMenuItem from '../../block/price-menu/item';
import * as pricingTable from '../../block/pricing-table';
import * as pricingTableItem from '../../block/pricing-table/item';
import * as ratingBox from '../../block/rating-box';
import * as ratingBoxItem from '../../block/rating-box/item';
import * as slider from '../../block/slider';
import * as sliderItem from '../../block/slider/item';
import * as step from '../../block/step';
import * as stepItemStandard from '../../block/step/item/standard';
import * as stepItemFree from '../../block/step/item/free';
import * as testimonial from '../../block/testimonial';
import * as testimonialItem from '../../block/testimonial/item';
import * as thumbnailGallery from '../../block/thumbnail-gallery';
import * as thumbnailGalleryItem from '../../block/thumbnail-gallery/item';

[
	//accordion,
	//accordionItem,
	//alert,
	//balloon,
	//box,
	//btn,
	//btnBox,
	categoriesList,
	countdown,
	directoryStructure,
	directoryStructureItemDirectory,
	directoryStructureItemFile,
	evaluationStar,
	faq,
	faqItem,
	items,
	itemsItem,
	itemsItemStandard,
	itemsItemBlockLink,
	itemsItemBanner,
	limitedDatetime,
	list,
	mediaText,
	panels,
	panelsItemVertical,
	panelsItemHorizontal,
	priceMenu,
	priceMenuItem,
	pricingTable,
	pricingTableItem,
	ratingBox,
	ratingBoxItem,
	slider,
	sliderItem,
	step,
	stepItemStandard,
	stepItemFree,
	testimonial,
	testimonialItem,
	thumbnailGallery,
	thumbnailGalleryItem,
].forEach( registerBlock );

import * as badge from '../../format/badge';
import * as highlighter from '../../format/highlighter';
import * as removeFormatting from '../../format/remove-fomatting';

[
	badge,
	highlighter,
	removeFormatting,
].forEach( registerFormat );
