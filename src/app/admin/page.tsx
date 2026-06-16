'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Plus, Trash2, Edit2, LogOut, Key, Upload, Eye, EyeOff, Check, AlertCircle, Loader2, RefreshCw, Mail, FolderKanban, Users, Menu, X, Database } from 'lucide-react';
import Link from 'next/link';

interface Work {
  id: number;
  beforeImage: string;
  afterImage: string;
  thumbnail: string;
  label: string;
}

interface Client {
  id: number;
  name: string;
  image: string;
  subscribers?: string;
  highlightSide?: 'left' | 'right';
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  const [activeTab, setActiveTab] = useState<'works' | 'clients'>('works');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Works State
  const [works, setWorks] = useState<Work[]>([]);
  const [editingWork, setEditingWork] = useState<Work | null>(null);
  const [workLabel, setWorkLabel] = useState('');
  const [workBeforeImage, setWorkBeforeImage] = useState('');
  const [workAfterImage, setWorkAfterImage] = useState('');
  const [workThumbnail, setWorkThumbnail] = useState('');
  const [isUploadingBefore, setIsUploadingBefore] = useState(false);
  const [isUploadingAfter, setIsUploadingAfter] = useState(false);
  const [isUploadingThumb, setIsUploadingThumb] = useState(false);

  // Clients State
  const [clients, setClients] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientImage, setClientImage] = useState('');
  const [clientSubscribers, setClientSubscribers] = useState('');
  const [clientHighlightSide, setClientHighlightSide] = useState<'left' | 'right' | ''>('');
  const [isUploadingClientImg, setIsUploadingClientImg] = useState(false);

  // Status State
  const [globalLoading, setGlobalLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);
  const clientInputRef = useRef<HTMLInputElement>(null);

  const fetchData = useCallback(async () => {
    setGlobalLoading(true);
    try {
      const url = activeTab === 'works' ? '/api/admin/works' : '/api/admin/clients';
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        if (activeTab === 'works') {
          setWorks(data);
        } else {
          setClients(data);
        }
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setGlobalLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    const savedToken = localStorage.getItem('admin_token');
    const savedEmail = localStorage.getItem('admin_email');
    if (savedToken && savedEmail) {
      setTimeout(() => {
        setPassword(savedToken);
        setEmail(savedEmail);
        setIsAuthenticated(true);
      }, 0);
    }
  }, []);

  useEffect(() => {
    // Lock scrolling on document html and body elements while in admin dashboard
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      // Restore scrolling on cleanup (e.g. going back to landing page)
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        fetchData();
      }, 0);
    }
  }, [isAuthenticated, fetchData]);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsLoadingAuth(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('admin_token', password);
        localStorage.setItem('admin_email', email);
      } else {
        setAuthError(data.error || 'Authentication failed');
      }
    } catch {
      setAuthError('Network error occurred');
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    setIsAuthenticated(false);
    setPassword('');
    setEmail('');
    setWorks([]);
    setClients([]);
  };

  const handleImageUpload = async (
    file: File,
    setImageUrl: (url: string) => void,
    setUploading: (loading: boolean) => void
  ) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${password}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setImageUrl(data.url);
        showMessage('success', 'Image uploaded successfully to Cloudinary!');
      } else {
        showMessage('error', data.error || 'Failed to upload image');
      }
    } catch {
      showMessage('error', 'Error occurred during file upload');
    } finally {
      setUploading(false);
    }
  };

  // Works Actions
  const handleSaveWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workLabel || !workBeforeImage || !workAfterImage) {
      showMessage('error', 'Please fill in all required fields and upload images.');
      return;
    }

    const payload: Partial<Work> = {
      label: workLabel,
      beforeImage: workBeforeImage,
      afterImage: workAfterImage,
      thumbnail: workThumbnail || workAfterImage,
    };

    if (editingWork) {
      payload.id = editingWork.id;
    }

    try {
      const res = await fetch('/api/admin/works', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setWorks(data.works);
        resetWorkForm();
        showMessage('success', editingWork ? 'Work updated successfully!' : 'New work added!');
      } else {
        showMessage('error', data.error || 'Failed to save work');
      }
    } catch {
      showMessage('error', 'Error saving work item');
    }
  };

  const handleDeleteWork = async (id: number) => {
    if (!confirm('Are you sure you want to delete this showcase set?')) return;

    try {
      const res = await fetch(`/api/admin/works?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${password}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setWorks(data.works);
        showMessage('success', 'Work deleted successfully');
      } else {
        showMessage('error', data.error || 'Failed to delete');
      }
    } catch {
      showMessage('error', 'Error deleting work item');
    }
  };

  const handleEditWork = (work: Work) => {
    setEditingWork(work);
    setWorkLabel(work.label);
    setWorkBeforeImage(work.beforeImage);
    setWorkAfterImage(work.afterImage);
    setWorkThumbnail(work.thumbnail);
  };

  const resetWorkForm = () => {
    setEditingWork(null);
    setWorkLabel('');
    setWorkBeforeImage('');
    setWorkAfterImage('');
    setWorkThumbnail('');
    if (beforeInputRef.current) beforeInputRef.current.value = '';
    if (afterInputRef.current) afterInputRef.current.value = '';
    if (thumbInputRef.current) thumbInputRef.current.value = '';
  };

  // Clients Actions
  const handleSaveClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientImage) {
      showMessage('error', 'Name and Creator Avatar image are required.');
      return;
    }

    const payload: Partial<Client> = {
      name: clientName,
      image: clientImage,
      subscribers: clientSubscribers || undefined,
      highlightSide: clientHighlightSide === '' ? undefined : (clientHighlightSide as 'left' | 'right'),
    };

    if (editingClient) {
      payload.id = editingClient.id;
    }

    try {
      const res = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${password}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setClients(data.clients);
        resetClientForm();
        showMessage('success', editingClient ? 'Creator updated successfully!' : 'New creator added!');
      } else {
        showMessage('error', data.error || 'Failed to save creator');
      }
    } catch {
      showMessage('error', 'Error saving client item');
    }
  };

  const handleDeleteClient = async (id: number) => {
    if (!confirm('Are you sure you want to delete this creator from list?')) return;

    try {
      const res = await fetch(`/api/admin/clients?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${password}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setClients(data.clients);
        showMessage('success', 'Creator deleted successfully');
      } else {
        showMessage('error', data.error || 'Failed to delete');
      }
    } catch {
      showMessage('error', 'Error deleting client item');
    }
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setClientName(client.name);
    setClientImage(client.image);
    setClientSubscribers(client.subscribers || '');
    setClientHighlightSide(client.highlightSide || '');
  };

  const resetClientForm = () => {
    setEditingClient(null);
    setClientName('');
    setClientImage('');
    setClientSubscribers('');
    setClientHighlightSide('');
    if (clientInputRef.current) clientInputRef.current.value = '';
  };

  // Auth Screen
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-deep)',
        padding: '1.5rem',
        fontFamily: 'var(--font-family)'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '420px',
          background: 'var(--bg-card)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border-glass)',
          borderRadius: '1.5rem',
          padding: '2.25rem 1.75rem',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 30px var(--primary-glow)',
          animation: 'fadeInUp 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h1 className="title-gradient" style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Admin Access</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Enter credentials to manage your catalog</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Email Address</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Mail size={16} style={{ position: 'absolute', left: '1rem', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@smartadverts.com"
                  style={{
                    width: '100%',
                    padding: '0.6rem 1rem 0.6rem 2.5rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '0.75rem',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'var(--transition-smooth)'
                  }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Password</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Key size={16} style={{ position: 'absolute', left: '1rem', color: 'var(--text-muted)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  style={{
                    width: '100%',
                    padding: '0.6rem 1rem 0.6rem 2.5rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '0.75rem',
                    color: 'var(--text-main)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'var(--transition-smooth)'
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {authError && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ff4a4a', fontSize: '0.85rem', background: 'rgba(255,74,74,0.1)', padding: '0.6rem 1rem', borderRadius: '0.5rem' }}>
                <AlertCircle size={16} />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoadingAuth}
              className="nav-cta"
              style={{
                width: '100%',
                padding: '0.75rem',
                justifyContent: 'center',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.95rem',
                marginTop: '0.5rem'
              }}
            >
              {isLoadingAuth ? <Loader2 size={16} className="animate-spin" /> : 'Sign In'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
            <Link href="/" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none', transition: 'var(--transition-smooth)' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--secondary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
              &larr; Back to home page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="admin-layout">
      {/* Mobile Top Header Bar */}
      <div className="admin-mobile-header">
        <h1 className="title-gradient" style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>SmartAdverts</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-main)',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Backdrop overlay for mobile drawer */}
      <div 
        className={`admin-overlay-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar Panel */}
      <aside className={`admin-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div>
          {/* Sidebar Top: Branding & Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-glass)' }}>
            <h1 className="title-gradient" style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>SmartAdverts</h1>
            <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 600 }}>Admin Catalog</span>
          </div>

          {/* User profile identifier snippet */}
          <div style={{ marginTop: '0.875rem', padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Logged In As</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={email}>
              {email}
            </div>
          </div>

          {/* Sidebar Navigation Links */}
          <nav className="admin-sidebar-nav">
            <button
              onClick={() => { setActiveTab('works'); setIsMobileMenuOpen(false); }}
              className={`admin-sidebar-link ${activeTab === 'works' ? 'active' : ''}`}
            >
              <FolderKanban size={14} />
              Showcase Gallery
            </button>
            <button
              onClick={() => { setActiveTab('clients'); setIsMobileMenuOpen(false); }}
              className={`admin-sidebar-link ${activeTab === 'clients' ? 'active' : ''}`}
            >
              <Users size={14} />
              Creators List
            </button>
          </nav>
        </div>

        {/* Sidebar Bottom Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', borderTop: '1px solid var(--border-glass)', paddingTop: '0.75rem' }}>
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.5rem',
              transition: 'var(--transition-smooth)'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-main)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            &larr; View Website
          </Link>
          <button
            onClick={handleLogout}
            style={{
              background: 'rgba(255, 74, 74, 0.1)',
              border: '1px solid rgba(255, 74, 74, 0.2)',
              color: '#ff4a4a',
              padding: '0.45rem 0.75rem',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
              width: '100%',
              transition: 'var(--transition-smooth)'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255, 74, 74, 0.2)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 74, 74, 0.1)'; }}
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Board */}
      <main className="admin-main-board">
        {/* Top Header Bar */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-glass)',
          paddingBottom: '0.75rem',
          marginBottom: '1rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
              {activeTab === 'works' ? 'Showcase Gallery Sets' : 'Client Creators List'}
            </h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.1rem 0 0 0' }}>
              Add, edit, or delete items instantly. Changes sync automatically.
            </p>
          </div>
          
          <button 
            onClick={fetchData} 
            disabled={globalLoading}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-glass)',
              borderRadius: '0.5rem',
              color: 'var(--text-muted)',
              padding: '0.4rem 0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.8rem',
              transition: 'var(--transition-smooth)'
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--border-glass-active)'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-glass)'}
          >
            <RefreshCw size={14} className={globalLoading ? 'animate-spin' : ''} />
            <span>Reload</span>
          </button>
        </header>

        {/* Toast Notification */}
        {message && (
          <div style={{
            position: 'fixed',
            bottom: '2.5rem',
            right: '2.5rem',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: message.type === 'success' ? 'rgba(46, 213, 115, 0.15)' : 'rgba(255, 74, 74, 0.15)',
            border: `1px solid ${message.type === 'success' ? '#2ed573' : '#ff4a4a'}`,
            color: message.type === 'success' ? '#2ed573' : '#ff4a4a',
            padding: '0.75rem 1.25rem',
            borderRadius: '0.75rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            animation: 'fadeInUp 0.3s ease'
          }}>
            {message.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
            <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{message.text}</span>
          </div>
        )}

        {/* Metrics Stats Row */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'var(--primary-glow)', border: '1px solid var(--border-glass-active)', color: 'var(--secondary)' }}>
              <FolderKanban size={18} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Total Showcase Sets</span>
              <span className="stat-value">{works.length}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'var(--primary-glow)', border: '1px solid var(--border-glass-active)', color: 'var(--secondary)' }}>
              <Users size={18} />
            </div>
            <div className="stat-info">
              <span className="stat-label">Active Creators</span>
              <span className="stat-value">{clients.length}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ background: 'rgba(46, 213, 115, 0.1)', border: '1px solid rgba(46, 213, 115, 0.2)', color: '#2ed573' }}>
              <Database size={18} />
            </div>
            <div className="stat-info">
              <span className="stat-label">CDN Status</span>
              <span className="stat-value" style={{ color: '#2ed573', fontSize: '0.85rem', fontWeight: 700 }}>Connected</span>
            </div>
          </div>
        </section>

        {/* Panels Container */}
        <div className="admin-grid-layout">
          
          {/* List Section */}
          <div className="compact-card" style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glass)',
            position: 'relative'
          }}>
            {globalLoading && (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                <Loader2 size={24} className="animate-spin" style={{ color: 'var(--secondary)' }} />
              </div>
            )}

            {!globalLoading && activeTab === 'works' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {works.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem', fontSize: '0.85rem' }}>No showcase items available. Add one on the right!</p>
                ) : (
                  works.map((work) => (
                    <div key={work.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(255,255,255,0.01)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '0.75rem',
                      padding: '0.75rem',
                      gap: '0.75rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', gap: '3px' }}>
                          <img src={work.beforeImage} alt="Before" style={{ width: '50px', height: '35px', objectFit: 'cover', borderRadius: '0.25rem', border: '1px solid rgba(255,255,255,0.08)' }} />
                          <img src={work.afterImage} alt="After" style={{ width: '50px', height: '35px', objectFit: 'cover', borderRadius: '0.25rem', border: '1px solid var(--border-glass-active)' }} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{work.label}</div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ID: {work.id}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button
                          onClick={() => handleEditWork(work)}
                          className="compact-btn"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-glass)', color: '#fff', padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}
                        >
                          <Edit2 size={12} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteWork(work.id)}
                          className="compact-btn"
                          style={{ background: 'rgba(255, 74, 74, 0.08)', border: '1px solid rgba(255, 74, 74, 0.15)', color: '#ff4a4a', padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {!globalLoading && activeTab === 'clients' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {clients.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1.5rem', fontSize: '0.85rem' }}>No client creators available. Add one on the right!</p>
                ) : (
                  clients.map((client) => (
                    <div key={client.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(255,255,255,0.01)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '0.75rem',
                      padding: '0.75rem',
                      gap: '0.75rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={client.image} alt={client.name} style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '50%', border: '1.5px solid var(--border-glass)' }} />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{client.name}</div>
                          <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', marginTop: '0.15rem' }}>
                            {client.subscribers && <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.04)', padding: '0.05rem 0.3rem', borderRadius: '3px', color: 'var(--text-muted)' }}>{client.subscribers}</span>}
                            {client.highlightSide && <span style={{ fontSize: '0.65rem', background: 'var(--primary-glow)', border: '1px solid var(--border-glass-active)', padding: '0.05rem 0.3rem', borderRadius: '3px', color: 'var(--secondary)' }}>Badge: {client.highlightSide}</span>}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button
                          onClick={() => handleEditClient(client)}
                          className="compact-btn"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-glass)', color: '#fff', padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}
                        >
                          <Edit2 size={12} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClient(client.id)}
                          className="compact-btn"
                          style={{ background: 'rgba(255, 74, 74, 0.08)', border: '1px solid rgba(255, 74, 74, 0.15)', color: '#ff4a4a', padding: '0.35rem 0.65rem', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}
                        >
                          <Trash2 size={12} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Form Section */}
          <div className="compact-card" style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-glass)',
            height: 'fit-content'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 1rem 0' }}>
              {activeTab === 'works' 
                ? (editingWork ? 'Edit Showcase Set' : 'Add New Showcase Set') 
                : (editingClient ? 'Edit Creator Profile' : 'Add New Creator Profile')}
            </h3>

            {activeTab === 'works' ? (
              <form onSubmit={handleSaveWork} className="compact-form" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="compact-form-group">
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Set Label (e.g. Set 6)</label>
                  <input
                    type="text"
                    value={workLabel}
                    onChange={(e) => setWorkLabel(e.target.value)}
                    placeholder="Enter set name/label"
                    className="compact-input"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-glass)',
                      color: 'var(--text-main)',
                      outline: 'none'
                    }}
                    required
                  />
                </div>

                {/* Before Image Uploader */}
                <div className="compact-form-group">
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Before Image (Raw)</label>
                  <input
                    type="file"
                    ref={beforeInputRef}
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], setWorkBeforeImage, setIsUploadingBefore)}
                    style={{ display: 'none' }}
                    accept="image/*"
                  />
                  
                  {isUploadingBefore ? (
                    <div className="upload-zone" style={{ cursor: 'wait' }}>
                      <Loader2 size={16} className="upload-zone-icon animate-spin" style={{ color: 'var(--secondary)' }} />
                      <span className="upload-zone-text" style={{ color: 'var(--secondary)' }}>Uploading image to CDN...</span>
                    </div>
                  ) : workBeforeImage ? (
                    <div className="upload-preview-container">
                      <img src={workBeforeImage} alt="Before Preview" className="upload-preview-image" />
                      <button
                        type="button"
                        className="upload-preview-delete"
                        onClick={() => {
                          setWorkBeforeImage('');
                          if (beforeInputRef.current) beforeInputRef.current.value = '';
                        }}
                        title="Remove image"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div 
                        className="upload-zone" 
                        onClick={() => beforeInputRef.current?.click()}
                      >
                        <Upload size={16} className="upload-zone-icon" />
                        <span className="upload-zone-text">Click to upload raw image</span>
                      </div>
                      <input
                        type="text"
                        value={workBeforeImage}
                        onChange={(e) => setWorkBeforeImage(e.target.value)}
                        placeholder="Or paste image URL"
                        className="compact-input"
                        style={{
                          width: '100%',
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid var(--border-glass)',
                          color: 'var(--text-main)',
                          outline: 'none',
                          marginTop: '0.35rem'
                        }}
                      />
                    </>
                  )}
                </div>

                {/* After Image Uploader */}
                <div className="compact-form-group">
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>After Image (Optimized Ad)</label>
                  <input
                    type="file"
                    ref={afterInputRef}
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], setWorkAfterImage, setIsUploadingAfter)}
                    style={{ display: 'none' }}
                    accept="image/*"
                  />
                  
                  {isUploadingAfter ? (
                    <div className="upload-zone" style={{ cursor: 'wait' }}>
                      <Loader2 size={16} className="upload-zone-icon animate-spin" style={{ color: 'var(--secondary)' }} />
                      <span className="upload-zone-text" style={{ color: 'var(--secondary)' }}>Uploading image to CDN...</span>
                    </div>
                  ) : workAfterImage ? (
                    <div className="upload-preview-container">
                      <img src={workAfterImage} alt="After Preview" className="upload-preview-image" />
                      <button
                        type="button"
                        className="upload-preview-delete"
                        onClick={() => {
                          setWorkAfterImage('');
                          if (afterInputRef.current) afterInputRef.current.value = '';
                        }}
                        title="Remove image"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div 
                        className="upload-zone" 
                        onClick={() => afterInputRef.current?.click()}
                      >
                        <Upload size={16} className="upload-zone-icon" />
                        <span className="upload-zone-text">Click to upload optimized ad</span>
                      </div>
                      <input
                        type="text"
                        value={workAfterImage}
                        onChange={(e) => setWorkAfterImage(e.target.value)}
                        placeholder="Or paste image URL"
                        className="compact-input"
                        style={{
                          width: '100%',
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid var(--border-glass)',
                          color: 'var(--text-main)',
                          outline: 'none',
                          marginTop: '0.35rem'
                        }}
                      />
                    </>
                  )}
                </div>

                {/* Thumbnail Image Uploader (Optional) */}
                <div className="compact-form-group">
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Thumbnail (Optional)</label>
                  <input
                    type="file"
                    ref={thumbInputRef}
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], setWorkThumbnail, setIsUploadingThumb)}
                    style={{ display: 'none' }}
                    accept="image/*"
                  />
                  
                  {isUploadingThumb ? (
                    <div className="upload-zone" style={{ cursor: 'wait' }}>
                      <Loader2 size={16} className="upload-zone-icon animate-spin" style={{ color: 'var(--secondary)' }} />
                      <span className="upload-zone-text" style={{ color: 'var(--secondary)' }}>Uploading image to CDN...</span>
                    </div>
                  ) : workThumbnail ? (
                    <div className="upload-preview-container">
                      <img src={workThumbnail} alt="Thumbnail Preview" className="upload-preview-image" />
                      <button
                        type="button"
                        className="upload-preview-delete"
                        onClick={() => {
                          setWorkThumbnail('');
                          if (thumbInputRef.current) thumbInputRef.current.value = '';
                        }}
                        title="Remove image"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div 
                        className="upload-zone" 
                        onClick={() => thumbInputRef.current?.click()}
                      >
                        <Upload size={16} className="upload-zone-icon" />
                        <span className="upload-zone-text">Click to upload thumbnail</span>
                      </div>
                      <input
                        type="text"
                        value={workThumbnail}
                        onChange={(e) => setWorkThumbnail(e.target.value)}
                        placeholder="Or paste image URL"
                        className="compact-input"
                        style={{
                          width: '100%',
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid var(--border-glass)',
                          color: 'var(--text-main)',
                          outline: 'none',
                          marginTop: '0.35rem'
                        }}
                      />
                    </>
                  )}
                </div>

                {/* Form Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button
                    type="submit"
                    className="nav-cta compact-btn"
                    style={{ flexGrow: 1, display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '0.35rem', height: 'auto', padding: '0.55rem' }}
                  >
                    <Plus size={14} />
                    {editingWork ? 'Update Set' : 'Add Set'}
                  </button>
                  {editingWork && (
                    <button
                      type="button"
                      onClick={resetWorkForm}
                      className="compact-btn"
                      style={{ padding: '0.55rem 0.85rem', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-glass)', color: '#fff', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <form onSubmit={handleSaveClient} className="compact-form" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="compact-form-group">
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Creator Name</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Enter creator name"
                    className="compact-input"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-glass)',
                      color: 'var(--text-main)',
                      outline: 'none'
                    }}
                    required
                  />
                </div>

                {/* Client Avatar Image Uploader */}
                <div className="compact-form-group">
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Profile Avatar Image</label>
                  <input
                    type="file"
                    ref={clientInputRef}
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], setClientImage, setIsUploadingClientImg)}
                    style={{ display: 'none' }}
                    accept="image/*"
                  />
                  
                  {isUploadingClientImg ? (
                    <div className="upload-zone" style={{ cursor: 'wait' }}>
                      <Loader2 size={16} className="upload-zone-icon animate-spin" style={{ color: 'var(--secondary)' }} />
                      <span className="upload-zone-text" style={{ color: 'var(--secondary)' }}>Uploading image to CDN...</span>
                    </div>
                  ) : clientImage ? (
                    <div className="upload-preview-container" style={{ display: 'flex', justifyContent: 'center', background: 'rgba(255,255,255,0.01)', padding: '0.5rem 0' }}>
                      <div style={{ position: 'relative' }}>
                        <img src={clientImage} alt="Avatar Preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%', border: '1.5px solid var(--border-glass-active)' }} />
                        <button
                          type="button"
                          className="upload-preview-delete"
                          onClick={() => {
                            setClientImage('');
                            if (clientInputRef.current) clientInputRef.current.value = '';
                          }}
                          title="Remove image"
                          style={{ top: '-4px', right: '-4px' }}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div 
                        className="upload-zone" 
                        onClick={() => clientInputRef.current?.click()}
                      >
                        <Upload size={16} className="upload-zone-icon" />
                        <span className="upload-zone-text">Click to upload profile avatar</span>
                      </div>
                      <input
                        type="text"
                        value={clientImage}
                        onChange={(e) => setClientImage(e.target.value)}
                        placeholder="Or paste image URL"
                        className="compact-input"
                        style={{
                          width: '100%',
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid var(--border-glass)',
                          color: 'var(--text-main)',
                          outline: 'none',
                          marginTop: '0.35rem'
                        }}
                      />
                    </>
                  )}
                </div>

                <div className="compact-form-group">
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Subscribers Count (Optional)</label>
                  <input
                    type="text"
                    value={clientSubscribers}
                    onChange={(e) => setClientSubscribers(e.target.value)}
                    placeholder="e.g. 1.8 Million"
                    className="compact-input"
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-glass)',
                      color: 'var(--text-main)',
                      outline: 'none'
                    }}
                  />
                </div>

                <div className="compact-form-group">
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Highlight Badge (Optional)</label>
                  <select
                    value={clientHighlightSide}
                    onChange={(e) => setClientHighlightSide(e.target.value as 'left' | 'right' | '')}
                    className="compact-input"
                    style={{
                      width: '100%',
                      background: 'rgba(4, 7, 13, 0.95)',
                      border: '1px solid var(--border-glass)',
                      color: 'var(--text-main)',
                      outline: 'none'
                    }}
                  >
                    <option value="">No Badge</option>
                    <option value="left">Left Side</option>
                    <option value="right">Right Side</option>
                  </select>
                </div>

                {/* Form Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button
                    type="submit"
                    className="nav-cta compact-btn"
                    style={{ flexGrow: 1, display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '0.35rem', height: 'auto', padding: '0.55rem' }}
                  >
                    <Plus size={14} />
                    {editingClient ? 'Update Creator' : 'Add Creator'}
                  </button>
                  {editingClient && (
                    <button
                      type="button"
                      onClick={resetClientForm}
                      className="compact-btn"
                      style={{ padding: '0.55rem 0.85rem', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-glass)', color: '#fff', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
