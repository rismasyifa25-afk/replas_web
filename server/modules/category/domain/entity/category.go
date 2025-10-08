package entity

type Category struct {
	ID   uint   `gorm:"primaryKey" json:"id"`
	Name string `json:"name"`
}

func (*Category) TableName() string {
	return "categories"
}

func NewCategory(name string) *Category {
	return &Category{
		Name: name,
	}
}
