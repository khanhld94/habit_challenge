class CreateChallengers < ActiveRecord::Migration[5.1]
  def change
    create_table :challengers do |t|
      t.string :name
      t.integer :length
      t.datetime :start_at
      t.integer :status
      t.integer :longest
      t.integer :user_id

      t.timestamps
    end
  end
end
