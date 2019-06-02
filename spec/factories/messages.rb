FactoryBot.define do
    factory :message do
      content {Faker::Lorem.sentence}
      image {File.open("#{Rails.root}/Pictures/822D437D-1601-4739-A469-DB3C582809DD.pn")}
      user
      group
    end
  end