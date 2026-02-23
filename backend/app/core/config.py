from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    openai_api_key: str = Field(default='')
    database_url: str = Field(default='sqlite:///./data/db.sqlite3')

    class Config:
        env_file = '.env'


settings = Settings()
