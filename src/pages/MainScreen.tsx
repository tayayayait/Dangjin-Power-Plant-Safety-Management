import { categories } from '@/data/categories';
import { useKiosk } from '@/context/KioskContext';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppBottomBar } from '@/components/layout/AppBottomBar';

export default function MainScreen() {
  const { selectCategory } = useKiosk();

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      {/* Content area — Bento Grid */}
      <main className="pt-[80px] pb-[72px] min-h-screen flex items-center">
        <div className="w-full max-w-[1760px] mx-auto px-12">
          <div className="grid grid-cols-4 gap-8">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => selectCategory(cat.id)}
                  className="group bg-card rounded-2xl p-8 shadow-sm border border-gray-100 text-left
                    hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20
                    active:scale-[0.98] active:shadow-sm
                    focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:ring-offset-2
                    transition-all duration-300 touch-ripple"
                  aria-label={`${cat.name} 카테고리로 이동`}
                >
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-5
                    group-hover:from-primary group-hover:to-primary-dark group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-300">
                    <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Text */}
                  <h3 className="text-h3 text-foreground font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <p className="text-body-sm text-gray-500 leading-relaxed">
                    {cat.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      <AppBottomBar />
    </div>
  );
}
