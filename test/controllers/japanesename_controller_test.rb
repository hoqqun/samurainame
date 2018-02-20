require 'test_helper'

class JapanesenameControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get japanesename_index_url
    assert_response :success
  end

end
