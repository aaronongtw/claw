module ApplicationHelper
  def smart_nav
    nav = ''

    if @current_user.present? && @current_user.admin?
      nav += '<li class="pure-menu-item">' + link_to('Show Users', users_path, :class => "pure-menu-link") + '</li>'
    end
    if @current_user.present?

      nav += '<li class="pure-menu-item">' + link_to("Log out #{@current_user.email}", login_path, :class => "pure-menu-link", :method => :delete ) + '</li>'
      nav += '<li class="pure-menu-item">' + link_to('Edit User', edit_user_path(@current_user), :class => "pure-menu-link" )
    # else
    #   nav += '<li class="pure-menu-item">' +link_to('Sign up', new_user_path, :class => "pure-menu-link") + '</li>'
    end

    nav
  end
end

