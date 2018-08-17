class Challenger < ApplicationRecord
  belongs_to :user
  has_many :challenger_days
end
