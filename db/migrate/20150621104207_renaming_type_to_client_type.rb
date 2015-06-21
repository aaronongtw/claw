class RenamingTypeToClientType < ActiveRecord::Migration
  def change
    rename_column :clients, :type, :clienttype
  end
end
