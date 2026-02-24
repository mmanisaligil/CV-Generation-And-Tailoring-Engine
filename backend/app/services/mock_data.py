from app.schemas.cv import MasterCVData


def sample_master_data() -> MasterCVData:
    return MasterCVData(
        fullName='Alex Johnson',
        email='alex@example.com',
        phone='+1 202 555 0199',
        summary='Product-minded fullstack engineer with 6+ years building SaaS products.',
        education=[
            {
                'school': 'State University',
                'degree': 'BSc Computer Science',
                'startDate': '2013',
                'endDate': '2017',
            }
        ],
        experience=[
            {
                'role': 'Senior Software Engineer',
                'company': 'CloudOps Inc.',
                'startDate': '2021',
                'endDate': 'Present',
                'responsibilities': [
                    'Led migration to event-driven architecture reducing latency by 32%.',
                    'Built internal CV tooling that cut manual editing time by 70%.',
                    'Implemented CI/CD quality gates for faster safe releases.',
                    'Mentored 4 engineers and standardized code review practices.',
                    'Partnered with PMs to ship Tier-based template experiences.',
                ],
            }
        ],
        skills=['TypeScript', 'React', 'Next.js', 'FastAPI', 'SQLite'],
        certificates=['AWS Developer Associate'],
        languages=['English', 'Turkish'],
        awards=['Hackathon Winner 2022'],
    )
