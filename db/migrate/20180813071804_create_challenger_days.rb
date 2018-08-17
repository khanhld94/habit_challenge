class CreateChallengerDays < ActiveRecord::Migration[5.1]
  def change
    create_table :challenger_days do |t|
      t.string :day
      t.integer :status
      t.text :content
      t.integer :challenger_id

      t.timestamps
    end
  end
end
