<?php

/**
 * @file
 *
 * The plugin to handle ShowMore pager.
 *
 * @ingroup views_pager_plugins
 */

class views_plugin_pager_showmore extends views_plugin_pager_mini {

  /**
   * Summary title overwrite.
   */
  function summary_title() {
    if (!empty($this->options['offset'])) {
      return format_plural($this->options['items_per_page'], 'ShowMore pager, @count item, skip @skip', 'ShowMore pager, @count items, skip @skip', array('@count' => $this->options['items_per_page'], '@skip' => $this->options['offset']));
    }
      return format_plural($this->options['items_per_page'], 'ShowMore pager, @count item', 'ShowMore pager, @count items', array('@count' => $this->options['items_per_page']));
  }

  /**
   * Options definition overwrite.
   */
  function option_definition() {
    $options = parent::option_definition();
    $options['waypoint'] = array(
      'contains' => array(
        'infinite' => array('default' => FALSE),
      ),
    );
    $options['more_button_text'] = array(
      'default' => t('Show more'),
      'translateable' => TRUE,
    );
    $options['advance'] = array(
      'contains' => array(
        'row_class' => array('default' => ''),
        'content_class' => array('default' => ''),
      ),
    );
    return $options;
  }

  /**
   * Options form overwrite.
   */
  function options_form(&$form, &$form_state) {
    parent::options_form($form, $form_state);

    // Keep items per page as the first form element on the page followed by
    // the option to change the 'load more' button text
    $form['items_per_page']['#weight'] = -2;

    // Option for users to specify the text used on the 'load more' button.
    $form['more_button_text'] = array(
      '#type' => 'textfield',
      '#title' => t('More link text'),
      '#description' => t('The text that will be displayed on the link that is used to load more elements. For example "Show more"'),
      '#default_value' => $this->options['more_button_text'] ? $this->options['more_button_text'] : t('Show more'),
      '#weight' => -1,
    );
  }

  /**
   * render overwrite.
   */
  function render($input) {
    $pager_theme = views_theme_functions('views_showmore_pager', $this->view, $this->display);

    $vars = array(
      'parameters' => $input,
      'element' => $this->options['id'],
      'more_button_text' => $this->options['more_button_text'],
    );

    return theme($pager_theme, $vars);
  }
}
