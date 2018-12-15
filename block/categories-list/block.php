<?php
	
	$categories = get_categories();
	$block_content = '';
	if ( ! empty( $categories ) ) {
		$output_markup = '';
		$articles = esc_html__( 'articles', 'snow-monkey-blocks' );
		$latest_posts_count = esc_html__( '%1$d latest_posts', 'snow-monkey-blocks' );
		$no_title = esc_html__( 'no title', 'snow-monkey-blocks' );

		foreach( $categories as $category ) {
			$category_detail = get_category( $category );
			$output = '<li class="smb-categories-list__cat">';
			$output .= sprintf( '<h4>%1$d<span>%2$s</span></h4>', $category_detail->count, $articles );
			$output .= '<div class="detail">';
			$output .= '<h5><a href="' . get_category_link( $category_detail->term_id ) . '">' . $category_detail->cat_name . '</a></h5>';
			$output .= '<span class="description">' . $category_detail->category_description . '</span>';
			if ( ! empty( $attributes['articles'] ) ) {
				$output .= '<h6>' . sprintf( $latest_posts_count, $attributes['articles'] ) . '</h6>';
				$output .= '<ul class="latest-articles-list">';
				$posts = get_posts(
					array(
						'category' => $category_detail->term_id,
						'showposts' => (string) $attributes['articles'],
						'order' => 'ASC'
					)
				);
				global $post;
				if ( $posts ) {
					foreach( $posts as $post ) {
						setup_postdata( $post );
						$title = get_the_title() !== '' ? get_the_title() : $no_title;
						$output .= '<li><a href="' . get_permalink() . '">' . $title . '</a></li>';
					}
				}
				$output .= '</ul>';
			}
			
			$output .= '</div>';
			$output .= '</li>';
			$output_markup .= $output;
		}

		$wrapper_markup = '<ul class="smb-categories-list">%1$s</ul>';
		$block_content = sprintf(
			$wrapper_markup,
			$output_markup
		);
	}
	echo $block_content;

