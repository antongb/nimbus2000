module ApplicationHelper
  def auth_token_input
    "<input type=\"hidden\" name=\"authenticity_token\" value=\"#{ form_authenticity_token}\">"
    .html_safe
  end

  def method_input(method)
    "<input type=\"hidden\" name=\"_method\" value=\"#{ method.to_s }\">"
    .html_safe
  end
end
