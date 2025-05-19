// pages/index.tsx
import { useState } from 'react';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div>
      <header>
        <h1 className="text-3xl font-bold mb-6">My Portfolio</h1>
        <nav>
          {/* Filter Buttons */}
          <button
            onClick={() => setSelectedCategory('all')}
            className="mr-4 text-lg hover:text-blue-500"
          >
            All
          </button>
          <button
            onClick={() => setSelectedCategory('frontend')}
            className="mr-4 text-lg hover:text-blue-500"
          >
            Frontend
          </button>
          <button
            onClick={() => setSelectedCategory('backend')}
            className="mr-4 text-lg hover:text-blue-500"
          >
            Backend
          </button>
        </nav>
      </header>

      <main>
        <section>
          <h2 className="text-2xl font-semibold mb-4">My Projects</h2>

          {/* Frontend Projects */}
          {selectedCategory === 'all' || selectedCategory === 'frontend' ? (
            <h1>Adding contents</h1>
          ) : null}

          {/* Backend Projects */}
          {selectedCategory === 'all' || selectedCategory === 'backend' ? (
            <h1>Adding contents</h1>
          ) : null}

          {/* Additional Projects can be added in a similar way */}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
