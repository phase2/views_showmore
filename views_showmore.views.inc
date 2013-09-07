<?php
/**
 * @file
 *
 *  Provides the views plugin information.
 */

/**
 * Implements hook_views_plugins().
 */
function views_showmore_views_plugins() {
  return array(
    'module' => 'views_showmore',
    'pager' => array(
      'showmore' => array(
        'title' => t('ShowMore Pager'),
        'help' => t('views_showmore'),
        'handler' => 'views_plugin_pager_showmore',
        'uses options' => TRUE,
        'parent' => 'full',
      ),
    ),
  );
}
