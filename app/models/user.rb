class User < ApplicationRecord
  validates :fb_id, presence: true
  validates_uniqueness_of :fb_id, case_sensitive: false
end
